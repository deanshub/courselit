import React, { ReactNode } from "react";
import { Box, Grid } from "@mui/material";
import WidgetByName from "./widget-by-name";
import AppToast from "../../../app-toast";
import { WidgetInstance } from "@courselit/common-models";
import { Footer, Header } from "@courselit/common-widgets";

interface TemplateProps {
    layout: WidgetInstance[];
    pageData: Record<string, unknown>;
    editing?: boolean;
    onEditClick?: (widgetId: string) => void;
    children?: ReactNode;
    childrenOnTop: boolean;
}

const EditableWidget = ({
    item,
    pageData,
    editing,
    onEditClick,
}: {
    item: Record<string, any>;
    pageData: Record<string, unknown>;
    editing: boolean;
    onEditClick?: (widgetId: string) => void;
}) => {
    if (editing) {
        return (
            <Box
                onClick={() => onEditClick && onEditClick(item.widgetId)}
                sx={{
                    position: "relative",
                    "&:hover": {
                        cursor: editing ? "pointer" : "default",
                    },
                    "&:after": {
                        content: '""',
                        position: "absolute",
                        width: 1,
                        height: 1,
                        top: 0,
                        left: 0,
                        background: "rgba(0,0,0,0.2)",
                        opacity: 0,
                        transition: "all 0.5s",
                    },
                    "&:hover:after": {
                        opacity: 1,
                    },
                }}
            >
                <WidgetByName
                    name={item.name}
                    settings={item.settings || {}}
                    pageData={pageData}
                    id={`widget${item._id}`}
                />
            </Box>
        );
    }

    return (
        <WidgetByName
            name={item.name}
            settings={item.settings || {}}
            pageData={pageData}
            id={`widget${item._id}`}
        />
    );
};

const Template = (props: TemplateProps) => {
    const {
        layout,
        pageData,
        editing = false,
        onEditClick,
        children,
        childrenOnTop = false,
    } = props;
    if (!layout) return <></>;
    const footer = layout.filter(
        (widget) => widget.name === Footer.metadata.name
    )[0];
    const header = layout.filter(
        (widget) => widget.name === Header.metadata.name
    )[0];

    return (
        <Grid container direction="column">
            {header && (
                <EditableWidget
                    item={header}
                    editing={editing}
                    pageData={pageData}
                    onEditClick={onEditClick}
                />
            )}
            {childrenOnTop && (
                <Grid
                    item
                    container
                    direction="column"
                    sx={{ minHeight: "80vh" }}
                >
                    <Grid item>{children}</Grid>
                    {layout
                        .filter(
                            (widget) =>
                                ![
                                    Header.metadata.name,
                                    Footer.metadata.name,
                                ].includes(widget.name)
                        )
                        .map((item: any, index: number) => (
                            <EditableWidget
                                item={item}
                                key={item.widgetId}
                                editing={editing}
                                onEditClick={onEditClick}
                                pageData={pageData}
                            />
                        ))}
                </Grid>
            )}
            {!childrenOnTop && (
                <Grid
                    item
                    container
                    direction="column"
                    sx={{ minHeight: "80vh" }}
                >
                    {layout
                        .filter(
                            (widget) =>
                                ![
                                    Header.metadata.name,
                                    Footer.metadata.name,
                                ].includes(widget.name)
                        )
                        .map((item: any, index: number) => (
                            <EditableWidget
                                item={item}
                                pageData={pageData}
                                key={item.widgetId}
                                editing={editing}
                                onEditClick={onEditClick}
                            />
                        ))}
                    <Grid item>{children}</Grid>
                </Grid>
            )}
            {footer && (
                <EditableWidget
                    item={footer}
                    pageData={pageData}
                    editing={editing}
                    onEditClick={onEditClick}
                />
            )}
            <AppToast />
        </Grid>
    );
};

export default Template;
