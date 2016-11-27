'use strict'

class CgroupController {
    *list(rq, rs) {
        let data = []
        yield rs.sendView('cgroup/list', data)
    }
}

module.exports = CgroupController
