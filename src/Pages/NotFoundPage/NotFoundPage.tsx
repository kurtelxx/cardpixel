import React from "react";
import { Layout } from "../../Components/index";

import "./styles.less";

export const NotFoundPage: React.FC<{}> = () => {
  return (
    <>
      <Layout.Container>
        <div className={"not-found-background"}>
          <span>404</span>
        </div>
      </Layout.Container>
    </>
  );
};
