import "./ui/DocumentLayoutWidget.css";
import { createElement } from "react";

export function DocumentLayoutWidget(props) {
    const { headerContent, bodyContent, footerContent } = props;

    const className = "document-layout-widget " + props.class;

    // Created based on this blog post:
    // https://medium.com/@Idan_Co/the-ultimate-print-html-template-with-header-footer-568f415f6d2a

    // General idea is to use a table because the header and footer of a table will be repeated on every page.
    // However, the table footer on the last page will be shown directly underneath the content.
    // So a combination is used: A table to reserve space but not render any content.
    // Render content in the reserved space using position fixed.
    // Without reserving space using the table, the contents would overflow the header and footer.

    // The header/footer style only contains the height value.
    const headerStyle = {
        height: props.headerHeight.value
    };

    const footerStyle = {
        height: props.footerHeight.value
    };

    return (
        <div className={className}>
            <table className="layout-table">
                {props.useHeader.value === true && (
                    <thead>
                        <tr>
                            <td>
                                <div className="header-space" style={headerStyle}>
                                    &nbsp;
                                </div>
                            </td>
                        </tr>
                    </thead>
                )}
                <tbody>
                    <tr>
                        <td>
                            <div className="content">{bodyContent}</div>
                        </td>
                    </tr>
                </tbody>
                {props.useFooter.value === true && (
                    <tfoot>
                        <tr>
                            <td>
                                <div className="footer-space" style={footerStyle}>
                                    &nbsp;
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
            {props.useHeader.value === true && (
                <div className="header-content" style={headerStyle}>
                    {headerContent}
                </div>
            )}
            {props.useFooter.value === true && (
                <div className="footer-content" style={footerStyle}>
                    {footerContent}
                </div>
            )}
        </div>
    );
}
