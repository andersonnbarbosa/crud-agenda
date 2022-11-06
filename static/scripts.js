
$(document).ready(function () {
    voltar();
    limparCampos();
})

function limparCampos() {
    $("#nome").val("");
    $("#email").val("");
    $("#telefone").val("");
    $("#empresa").val("");
    $("#editar-nome").val("");
    $("#editar-email").val("");
    $("#editar-telefone").val("");
    $("#editar-empresa").val("");
    $("#params-busca").val("");
}

function menuEditar(id) {

    $.ajax({
        url: "/contato/id/" + id,
        type: 'GET',
        success: function (contato) {
            $("#editar-nome").val(contato.nome);
            $("#editar-email").val(contato.email);
            $("#editar-telefone").val(contato.telefone);
            $("#editar-empresa").val(contato.empresa);
            $(".btn-editar").html(`<button id="btn-editar" onclick="editar(${contato.id})" class="btn btn-dark"><i class="bi bi-pencil"> </i>Editar</button>`)
        }
    });
    $(".opcoes").css("display", "none");
    $(".deletar").css("display", "none");
    $(".cadastrar").css("display", "none");
    $(".buscar").css("display", "none");
    $(".resultados").css("display", "none");
    $(".editar").css("display", "block");

}

function editar(id) {
    var nome = $("#editar-nome").val();
    var email = $("#editar-email").val();
    var telefone = $("#editar-telefone").val();
    var empresa = $("#editar-empresa").val();

    $.ajax({
        url: "/contato/" + id,
        type: 'PUT',
        data: { "nome": nome, "email": email, "telefone": telefone, "empresa": empresa },
        success: function (result) {
            alert("Editado com sucesso");
            limparCampos();
            voltar()
        },
        error: function () {
            alert("Erro");
        }
    })
}

function cadastrar() {
    var nome = $("#nome").val();
    var email = $("#email").val();
    var telefone = $("#telefone").val();
    var empresa = $("#empresa").val();
    $.ajax({
        url: "/contato",
        type: 'POST',
        data: { "nome": nome, "email": email, "telefone": telefone, "empresa": empresa },
        success: function (result) {
            alert("Adicionado com sucesso");
            limparCampos()
        }
    });
}
function buscar() {
    var busca = $("#params-busca").val()
    $.ajax({
        url: "/contato/" + busca,
        type: 'GET',
        success: function (result) {
            $(".resultados").css("display", "block")
            $(".mensagem").css("display", "none")
            $(".linhas").html(function () {
                var html = '';
                $.each(result, function (i, item) {
                    html += `<tr>
                        <td>${item.nome}</td>
                        <td>${item.telefone}</td>
                        <td>${item.empresa}</td>
                        <td>${item.email}</td>
                        <td><button class="btn btn-light" onclick="menuEditar(${item.id})"><i class="bi bi-pencil"></i></button>
                        <td><button class="btn btn-light"  onclick="deletar(${item.id})"><i class="bi bi-trash"></i></button>
                        </tr>`;
                });
                return html;
            })
        },
        error: function () {

            $(".resultados").css("display", "none")
            $(".mensagem").css("display", "block")
            $(".mensagem").html("<h5>Não há registros</h5>")

        }
    });
}
function todosContatos() {
    $.ajax({
        url: "/contato",
        type: 'GET',
        success: function (result) {
            $(".mensagem").css("display", "none")
            $(".resultados").css("display", "block")
            $(".linhas").html(function () {
                var html = '';
                $.each(JSON.parse(result), function (i, item) {
                    html += `<tr>
                        <td>${item.nome}</td>
                        <td>${item.telefone}</td>
                        <td>${item.empresa}</td>
                        <td>${item.email}</td>
                        <td><button class="btn btn-light" onclick="menuEditar(${item.id})"><i class="bi bi-pencil"></i></button>
                        <td><button class="btn btn-light" onclick="deletar(${item.id})"><i class="bi bi-trash"></i></button>
                        </tr>`;
                });
                return html;
            })
        },
        error: function () {

            $(".resultados").css("display", "none")
            $(".mensagem").css("display", "block")
            $(".mensagem").html("<h5>Não há registros</h5>")
        }
    });
}
function deletar(id) {
    $.ajax({
        url: "/contato/" + id,
        type: 'DELETE',
        success: function (result) {
            alert("Deletado com sucesso")
            buscar();
            todosContatos();
        },
        error: function () {
            alert("Erro");
        }

    });
}
function voltar() {
    $(".opcoes").css("display", "block");
    $(".deletar").css("display", "none");
    $(".cadastrar").css("display", "none");
    $(".buscar").css("display", "none");
    $(".resultados").css("display", "none");
    $(".editar").css("display", "none");
    $(".mensagem").css("display", "none")
    limparCampos();

}
function menuCadastrar() {
    $(".opcoes").css("display", "none");
    $(".deletar").css("display", "none");
    $(".cadastrar").css("display", "block");
    $(".buscar").css("display", "none");
    $(".resultados").css("display", "none");
    $(".editar").css("display", "none");
    $(".mensagem").css("display", "none")
    limparCampos();

}
function menuBuscar() {
    $(".opcoes").css("display", "none");
    $(".deletar").css("display", "none");
    $(".cadastrar").css("display", "none");
    $(".buscar").css("display", "block");
    $(".resultados").css("display", "none");
    $(".editar").css("display", "none");
    $(".mensagem").css("display", "none")
    limparCampos();

}
