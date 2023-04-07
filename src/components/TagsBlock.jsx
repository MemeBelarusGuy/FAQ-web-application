import React from "react";

import { SideBlock } from "./SideBlock";
import { TagItem } from "./tagItem";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Популярные Тэги:">
      {(isLoading ? [...Array(5)] : items).map((tag, index) =>
        <TagItem item={tag} key={index} />)}
    </SideBlock>
  );
};
