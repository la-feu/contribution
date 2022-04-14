function ask() {
    var title = document.getElementsByName('title')[0].value;
    var token = document.getElementsByName('token')[0].value;
    location.replace(location.origin + location.pathname + `?title=${encodeURI(title)}&token=${token}`);
}

if (location.search) {
    document.getElementById('result').innerHTML = `<h2>查询结果</h2>`;
    var search = {};
    for (var pair of location.search.substring(1).split('&')) {
        search[pair.split('=')[0]] = pair.split('=')[1];
    }
    search.title = decodeURI(search.title);
    if (search.title && search.token) {
        var reply = undefined;
        var req = new XMLHttpRequest();
        req.open('GET', 'https://raw.githubusercontent.com/la-feu/reply/main/reply.json');
        req.send(null);
        req.onload = () => {
            if (req.status == 200) {
                var allReply = JSON.parse(req.responseText);
                if (allReply[search.title] && allReply[search.title][search.token]) {
                    document.getElementById('result').append(allReply[search.title][search.token]);
                }
                else {
                    document.getElementById('result').append('无查询结果。');
                }
            }
            else {
                document.getElementById('result').append('查询失败。请检查网络。');
            }
        };
    }
    else {
        document.getElementById('result').append('请不要提供空信息。');
    }
}
