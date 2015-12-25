class ModelOpener
{
    bodyClass: string;
    modalClass: string;
    modelDisplay: string;
    backDropDisplay: string;

    modalHeader: string;
    modalBody: string;

    modalOnOpenCallback: any;
    modalOnClose:any;


    constructor()
    {
        this.hideModal();
    }

    hideModal()
    {
        this.bodyClass = "";
        this.modalClass = "";
        this.modelDisplay = "none";
        this.backDropDisplay = "none";

        this.modalBody = "";
        this.modalHeader = "";

        //on close
        if (this.modalOnClose != null)
        {
            this.modalOnClose();
        }
    }

    showHtml()
    {
        this.bodyClass = "modal-open";
        this.modalClass = "in";
        this.modelDisplay = "block";
        this.backDropDisplay = "block";
    }

    showModal(header, text, beforeOpenCallback = null, closeCallback = null)
    {
        this.modalBody = text;
        this.modalHeader = header;
        this.modalOnClose = closeCallback;
        this.modalOnOpenCallback = beforeOpenCallback;

        //before open
        if (this.modalOnOpenCallback != null)
        {
            this.modalOnOpenCallback();
        }

        this.showHtml();
    }

    setStyles()
    {
        return {
            // CSS property names
            'display': this.modelDisplay
        }
    }
}