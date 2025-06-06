import React from "react";
import Link from "@docusaurus/Link";
// import useBaseUrl from '@docusaurus/useBaseUrl'; // Keep if needed elsewhere
import { useWindowSize } from "@docusaurus/theme-common/internal";

// Import the CSS Modules
import gridStyles from "./widgets.module.css";
import cardStyles from "./widgets.module.css";

// Interface definitions remain the same
export interface Widget {
  id: string;
  title: string;
  icon: string;
  link: string;
}

interface WidgetCardProps {
  widget: Widget;
}

// --- WidgetCard Component (using CSS Modules) ---
export const WidgetCard: React.FC<WidgetCardProps> = ({ widget }) => {
  const widgetLink = widget.link; // Assuming link is already correct

  return (
    // Use CSS module class for the Link card
    <Link to={widgetLink} className={cardStyles.widgetLinkCard}>
      {/* Widget Icon */}
      <img
        src={widget.icon}
        alt={widget.title}
        className={cardStyles.widgetIcon} // Use CSS module class
      />
      {/* Widget Title */}
      <span
        className={`${cardStyles.widgetTitle} text-body-1 font-regular`} // Use CSS module class
      >
        {widget.title}
      </span>
    </Link>
  );
};

// --- WidgetsGrid Component (using CSS Modules) ---
interface WidgetsGridProps {
  title: string;
  description: string;
  widgets: Widget[];
}

const WidgetsGrid: React.FC<WidgetsGridProps> = ({
  title,
  description,
  widgets,
}) => {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  return (
    // Use CSS module class for the Section Container
    <section className={gridStyles.gridSection}>
      {/* Use CSS module class for the Section Title */}
      <p className={`${gridStyles.gridTitle}  ${isMobile?'text-h3':'text-h1'} font-semibold`}>{title}</p>

      {/* Use CSS module class for the Section Description */}
      <p className={`${gridStyles.gridDescription} ${isMobile?'text-caption-1':'text-body-1'} font-regular`}>{description}</p>

      {/* Use CSS module class for the Widgets Container */}
      <div className={gridStyles.widgetsContainer}>
        {Array.isArray(widgets) &&
          widgets.map((widget) => (
            <WidgetCard key={widget.id} widget={widget} />
          ))}
      </div>
    </section>
  );
};

export default WidgetsGrid;
