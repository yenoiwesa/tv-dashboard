const _ = require('lodash');
const Slide = require('./slide');

class GitlabMergeRequestsSlide extends Slide {

    constructor(mergeRequests, page, totalPages) {
        super('gitlabMergeRequests');
        this.mergeRequests = mergeRequests;
        this.page = page;
        this.totalPages = totalPages;
        this.duration = 20 * 1000;
    }

    isDisplayable() {
        return !_.isEmpty(this.mergeRequests);
    }

    getData() {
        const data = super.getData();
        data.mergeRequests = this.mergeRequests;
        data.page = this.page;
        data.totalPages = this.totalPages;
        return data;
    }

}

module.exports = GitlabMergeRequestsSlide;