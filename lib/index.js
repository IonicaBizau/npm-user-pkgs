"use strict";

const request = require("jsonrequest");

/**
 * npmUserPkgs
 * Fetch the packages created by the specified user.
 *
 * @name npmUserPkgs
 * @function
 * @param {String} username The npm username.
 * @param {Function} cb The callback function.
 */
module.exports = function npmUserPkgs (username, cb) {

    function doReq(offset) {
        return new Promise((res, rej) => {
            const reqUrl = `https://www.npmjs.com/profile/${username}/packages?offset=${offset}`;
            request(reqUrl, (err, data) => {
                if (err) { return rej(err); }
                if (!data.objects) {
                    return res([]);
                }
                res(data);
            });
        })
    }

    doReq(0).then(res => {
        if (res.hasMore) {
            let tasks = []
              , pkgs = res.objects
              , c = res.total / res.objects.length - 1
              ;

            for (var i = 0; i < c; ++i) {
                tasks.push(doReq(i + 1));
            }

            Promise.all(tasks).then(res => {
                pkgs = pkgs.concat.apply(pkgs, res.map(c => c.objects));
                process.nextTick(() => {
                    cb(null, pkgs);
                })
            }).catch(e => cb(e));
            return;
        }

        process.nextTick(() => {
            cb(null, res.objects);
        })
    }).catch(e => {
        cb(e);
    });
};
