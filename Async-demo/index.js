console.log("before");


// one(1)
// .then(res => two(res)).catch(err => console.log(err.message))
// .then(res => showRepo(res[0])).catch(err => console.log(err.message))
// .catch(err=>console.log(err.message))


async function displayCommit() {
    try {
        const user = await one(1);
        const repos = await two(user.name);
        const commit = await showRepo(repos[0]);
        console.log('commit : ', commit);
    } catch (error) {
        console.log('Error : ', error.message);
    }

}
displayCommit();


console.log("after");



function showRepo(repo) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('fetching commit');
            res('commit1')
        }, 2000)
    })
}




function one(id) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("database data...");
            res({ id: id, name: 'jvs' });
        }, 2000);

    })
}

function two(name) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log("git data...");
            res(['repo1', 'repo2', 'repo3', 'repo4']);
        }, 2000);
    })

}


