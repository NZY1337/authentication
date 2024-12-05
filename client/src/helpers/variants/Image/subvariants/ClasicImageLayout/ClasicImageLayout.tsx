import settings from "./settings";
import Container from "@mui/material/Container";
import RenderContent from "../../../../content/RenderContent";

interface ImageLayoutProps {
    gridSpacing: number;
}

const ClasicImageLayout = ({ gridSpacing }: ImageLayoutProps) => {
    return (
        <Container>
            <RenderContent data={settings} gridSpacing={gridSpacing} />
        </Container>
    );
};

export default ClasicImageLayout;