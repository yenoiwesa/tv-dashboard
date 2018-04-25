const Slide = require('./slide');

class GitlabMergeRequestsSlide extends Slide {

    constructor(mergeRequests) {
        super('gitlabMergeRequests');
        this.mergeRequests = mergeRequests;
        this.duration = 20 * 1000;
    }

    getData() {
        const data = super.getData();
        data.mergeRequests = this.mergeRequests;
        return data;
    }

}

module.exports = GitlabMergeRequestsSlide;