var quill = new Quill('#editor', {
    modules: {
        toolbar: [
            [ 'bold', 'italic' ]
        ]
    },
    formats: [ 'bold', 'italic' ],
    placeholder: '在此输入正文',
    theme: 'snow'
});

function submit() {
    document.getElementById('submit-region').innerHTML = `<i class="fa-solid fa-circle-notch fa-spin" style="font-size: 1.5em;"></i>`;
    var
    title = document.getElementsByName('title')[0].value || '无题',
    author = document.getElementsByName('author')[0].value || '匿名',
    format = document.getElementsByName('format')[0].value,
    info = document.getElementsByName('info')[0].value;
    var lines = quill.getLines();
    var formatted = '';
    var original = '';
    for (var line of lines) {
        if (!line.cache.delta) {
            var insert = line.domNode.innerText + `\n`;
            original += insert;
            if (format === '-') {
                continue;
            }
            if (format === '011' || format === '111') {
                insert = insert.replace(/\n/g, '\n\n');
            }
            else {
                insert = insert.replace(/\n/g, `\\\\\n`);
            }
            formatted += insert;
            continue;
        }
        if (line.cache.delta.length() === 1 && line.cache.delta.ops[0].insert === '\n') {
            original += `\n`;
            if (format === '-') {
                continue;
            }
            if (format === '011' || format === '111') {
                formatted += `\\vspace{1em}\n\n`;
            }
            else {
                formatted += `\n`;
            }
        }
        else {
            for (var op of line.cache.delta.ops) {
                var insert = op.insert;
                if (op.attributes) {
                    if (op.attributes.italic) {
                        insert = `\\textit{` + insert + `}`;
                    }
                    if (op.attributes.bold) {
                        insert = `\\textbf{` + insert + `}`;
                    }
                }
                original += insert;
                if (format === '-') {
                    continue;
                }
                if (format === '011' || format === '111') {
                    insert = insert.replace(/\n/g, '\n\n');
                }
                else {
                    insert = insert.replace(/\n/g, `\\\\\n`);
                }
                formatted += insert;
            }
        }
    }
    if (format !== '-') {
        if (format === '111' || format === '110') {
            formatted = `\\noind\n\n` + formatted + `\\ind\n\n`;
        }
        if (format === '010') {
            formatted = `\\begin{center}\n` + formatted + `\\end{center}\n\n`;
        }
        formatted = `\\headline{` + title + `}\n\n` + formatted + `\\byline{` + author + `}`;
    }
    original = `<h2>` + title + `</h2>` + original + `\n（作者：` + author + `）`;
    emailBody = `这是一封由火社投稿页面自动发送的邮件。\n说明：\n` + info + `<h1>ORIGINAL</h1>` + original;
    if (format === '-') {
        emailBody += `<h1>AUTOFORMAT DISABLED</h1>`;
    }
    else {
        emailBody += `<h1>FORMATTED</h1>` + formatted;
    }
    emailBody = emailBody.replace(/\n/g, `<br>`);
    Email.send({
        Host: 'smtp.163.com',
        Username: 'lafeu_auto',
        Password: 'WTFLVQHVSWUPGYGS',
        From: 'lafeu_auto@163.com',
        To: 'huooooosheeeee@163.com',
        Subject: '自动投稿：' + title + ' - ' + author,
        Body: emailBody
    }).then(msg => {
        if (msg === 'OK') {
            alert('投稿成功！');
            location.reload();
        }
        else {
            alert('出错了，请重试。\n如果错误没能解决，请将下面的错误信息发送至huooooosheeeee@163.com。\n' + msg);
            document.getElementById('submit-region').innerHTML = `<button type="button" id="submit" onclick="submit();"><strong>提交</strong></button>`;
        }
    });
}
