import React, { PropsWithChildren } from "react";
import cn from "classnames";

import "./styles.less";

export function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
  return <div className="layoutWrapper">{children}</div>;
}

function LeftPanel({ children }: PropsWithChildren<{}>): JSX.Element {
  return <div className={"leftPanel"}>{children}</div>;
}

function Container({
  children,
  gap = 0,
  isColumn,
  backgroundColor,
}: PropsWithChildren<{
  gap?: number;
  isColumn?: boolean;
  backgroundColor?: string;
}>): JSX.Element {
  return (
    <div
      className={cn("container", isColumn ? "flexColumn" : "flexRow")}
      style={{ gap: gap, backgroundColor: backgroundColor || "" }}
    >
      {children}
    </div>
  );
}

function PanelContainer({ children }: PropsWithChildren<{}>): JSX.Element {
  return <div className={"panelContainer"}>{children}</div>;
}

LeftPanel.Container = PanelContainer;
Layout.LeftPanel = LeftPanel;
Layout.Container = Container;
