import express, { Request, Response } from "express";
import { prismaClient } from "..";
import { io } from "../utils/socket";

const router = express.Router();

// Webhook received: {
//     status: 'success',
//     data: {
//       job_id: '67d5a960ff02542909088b08',
//       job_status: 'done',
//       masks: [
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object]
//       ]
//     }
//   }
//   {
//     job_id: '67d5a960ff02542909088b08',
//     job_status: 'done',
//     masks: [
//       {
//         name: 'wall',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/17af1e86-5eb8-4114-9bfe-f93f1a16ef16_segment.png',
//         center: [Object],
//         category: 'architectural,landscaping',
//         area_percent: 55.06555316091954
//       },
//       {
//         name: 'rug',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/82859d7f-3275-4f09-912f-476cf0ffc7a3_segment.png',
//         center: [Object],
//         category: 'furnishing,landscaping',
//         area_percent: 3.0392420977011496
//       },
//       {
//         name: 'floor',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/b813b1c9-ef56-43b9-9389-f4463d62f264_segment.png',
//         center: [Object],
//         category: 'architectural,landscaping',
//         area_percent: 7.043372844827586
//       },
//       {
//         name: 'fireplace',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/b3dbe184-ea3c-4cc4-9cc7-c50252ed2dd0_segment.png',
//         center: [Object],
//         category: 'furnishing,landscaping',
//         area_percent: 5.7870869252873565
//       },
//       {
//         name: 'stool',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/71f9ef0a-8012-43b1-ab1c-91ed8c3a1bfd_segment.png',
//         center: [Object],
//         category: 'furnishing',
//         area_percent: 0.04654573754789272
//       },
//       {
//         name: 'ceiling',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/d8a0cfa7-1b99-4aa9-b6be-c59c74bcb7d4_segment.png',
//         center: [Object],
//         category: 'architectural',
//         area_percent: 7.423670977011494
//       },
//       {
//         name: 'chair',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/c161bc01-349f-45a4-99dc-d7777e9fdede_segment.png',
//         center: [Object],
//         category: 'furnishing,landscaping',
//         area_percent: 3.9746467911877392
//       },
//       {
//         name: 'plate',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/20b67043-b395-4f2a-a81a-6064f4dba426_segment.png',
//         center: [Object],
//         category: 'furnishing',
//         area_percent: 0.19875478927203066
//       },
//       {
//         name: 'painting',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/09f29282-27c1-4c03-9d05-0d18354bb488_segment.png',
//         center: [Object],
//         category: 'furnishing,landscaping',
//         area_percent: 2.9115780651340994
//       },
//       {
//         name: 'vase',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/4497d951-34b4-421d-818f-af4741bf0fb8_segment.png',
//         center: [Object],
//         category: 'furnishing,landscaping',
//         area_percent: 0.13380028735632182
//       },
//       {
//         name: 'animal',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/4445eb92-e4a0-45b1-ad16-4ebbd4df4178_segment.png',
//         center: [Object],
//         category: 'furnishing,landscaping',
//         area_percent: 1.352819683908046
//       },
//       {
//         name: 'bathtub',
//         url: 'https://cdn.reimaginehome.ai/prod/mask/ce415403-7740-462c-8e2f-4417765a9852_segment.png',
//         center: [Object],
//         category: 'furnishing',
//         area_percent: 13.022030651340996
//       }
//     ]
//   } 

router.post("/webhook/mask", async (req: Request, res: Response) => {
    try {
        console.log("Webhook received:", req.body);

        const { job_id, masks, job_status } = req.body.data;

        if (job_status === "done") {
            const jobMask = await prismaClient.jobMask.findFirst({
                where: { jobId: job_id }
            });

            if (!jobMask) {
                console.error(`JobMask with job_id ${job_id} not found!`);
                return res.status(404).json({ error: "JobMask not found" });
            }

            // ✅ Now insert masks with valid jobMaskId
            for (const mask of masks) {
                await prismaClient.mask.create({
                    data: {
                        name: mask.name,
                        url: mask.url,
                        category: mask.category,
                        areaPercent: mask.area_percent,
                        jobMaskId: jobMask.id, // ✅ Guaranteed to exist now
                    }
                });
            }

            io.emit("masks_ready", { jobId: job_id, error: null});

            return res.status(200).send("Webhook received successfully!");
        }

        if (job_status === "error") {
            console.error("Error in mask processing:", req.body);
            io.emit("masks_ready", { jobId: null, error: "Error in mask processing"});
            return res.status(500).json({ error: "Mask processing failed" }); //
        }
    } catch (error) {
        console.error("Error processing webhook:", error);
        io.emit("masks_ready", { jobId: null, error: "Internal server error" });
        res.status(500).send("Internal Server Error");
    }
});

export default router;
