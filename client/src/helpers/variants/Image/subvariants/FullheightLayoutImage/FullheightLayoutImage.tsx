import settings from "./settings";
import RenderContent from "../../../../content/RenderContent";

interface ImageLayoutProps {
    gridSpacing: number;
}

const FullheightLayoutImage = ({ gridSpacing }: ImageLayoutProps) => {
    return (
        <RenderContent data={settings} gridSpacing={gridSpacing} />
    );
};

export default FullheightLayoutImage;