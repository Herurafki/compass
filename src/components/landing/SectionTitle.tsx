import React, { ReactElement, cloneElement } from "react";

interface SectionTitleProps {
  children: ReactElement<any>; 
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  const existingClass = children.props.className ?? "";

  return cloneElement(children, {
    className: `${existingClass} text-3xl lg:text-5xl lg:leading-tight font-bold`,
  });
};

export default SectionTitle;
