const year = new Date().getFullYear();

function Footer() {
    return (
        <div className="wrapper-footer">
            <strong>
                <span>Copyright © 2014 - {year}.</span>
            </strong>
            <span> All rights reserved</span>
            <div className="float-right">
                <strong>Version 5.5</strong>
            </div>
        </div>
    );
}

export default Footer;
