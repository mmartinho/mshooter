class Attachment {
    constructor(filename, content='', path='') {
        this.filename = filename;
        if(content) {this.content = content};
        if(path) {this.path = path};
    }
}

module.exports = Attachment;