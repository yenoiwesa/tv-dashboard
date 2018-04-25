const Slide = require('./slide');

class GitlabMergeRequestsSlide extends Slide {

    constructor(title, mergeRequests) {
        super('gitlabMergeRequests');
        this.title = title;
        this.mergeRequests = mergeRequests;
        this.duration = 10 * 1000;
    }

    getData() {
        const data = super.getData();
        data.title = this.title;
        data.mergeRequests = this.mergeRequests;
        return data;
    }

}

module.exports = GitlabMergeRequestsSlide;