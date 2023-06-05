import "./ui/DocumentLayoutWidget.css";
import { createElement } from "react";

export function DocumentLayoutWidget(props) {
    const { headerContent, bodyContent, footerContent, headerHeight, footerHeight } = props;

    const className = "document-layout-widget " + props.class;

    // Created based on this blog post:
    // https://medium.com/@Idan_Co/the-ultimate-print-html-template-with-header-footer-568f415f6d2a

    // The header/footer style only contains the height value.
    const headerStyle = {
        height: headerHeight + "px"
    };

    const footerStyle = {
        height: footerHeight + "px"
    };

    return (
        <div className={className}>
            <table>
                <thead>
                    <tr>
                        <td>
                            <div className="header-space" style={headerStyle}>
                                &nbsp;
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="content">{bodyContent}</div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <div className="footer-space" style={footerStyle}>
                                &nbsp;
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className="header" style={headerStyle}>
                {headerContent}
            </div>
            <div className="footer" style={footerStyle}>
                {footerContent}
            </div>
        </div>
    );
}
