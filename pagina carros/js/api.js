const listComments = async() => {
    const response = await fetch("http://127.0.0.1:8000/api/consultapersonas");
    const comments = await response.json();

    let tableBody = ``;
    comments.forEach((comment, index) => {
        tableBody += `<tr>
        <td class='centered'>${comment.id}</td>
        <td class='centered'>${comment.name}</td>
        <td class='centered'>${comment.email}</td>
        <td class='centered'>${comment.body}</td>
        </tr>`;
    });
    tableBody_Comments.innerHTML = tableBody;
};

window.addEventListener("load", function() {
    listComments();
});