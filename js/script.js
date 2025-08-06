const url_API = "https://api.github.com/users";
let dadosAPI = null;



async function consultarDadosAPI(usuario){
    try {
        const response = await fetch(`${url_API}/${usuario}`);

        if (!response.ok) {
            if (response.status === 404) {
                alert("Usuário não encontrado no GitHub!");
            } else {
                alert("Erro na busca. Tente novamente mais tarde.");
            }
            return;
        }

        const json = await response.json();

        dadosAPI = json;
        coletarDados(dadosAPI);

    } catch (error) {
        console.log("Erro na requisição: ", error);
    }
}

async function pesquisarUsuario(event){
    event.preventDefault();

    let usuario = document.querySelector(".inputSearch").value;
    consultarDadosAPI(usuario)
}



function coletarDados(dados) {
    const lista = document.querySelector(".boxContainerContent");

    const card = document.createElement("div");
    card.classList.add("userCard");

    card.innerHTML = `
        <div class="userAvatar">
            <img src="${dados.avatar_url}" alt="User Avatar">
            <div class="statusIndicator"></div>
        </div>

        <div class="userInfo">
            <h3 class="userName">${dados.name}</h3>
            <p class="userBio">${dados.bio || "Sem bio disponível"}</p>

            <div class="userStats">
                <div class="statItem">
                    <i class="bi bi-folder2-open"></i>
                    <span class="statNumber">${dados.public_repos}</span>
                    <span class="statLabel">Repos</span>
                </div>

                <div class="statItem">
                    <i class="bi bi-people"></i>
                    <span class="statNumber">${dados.followers}</span>
                    <span class="statLabel">Followers</span>
                </div>

                <div class="statItem">
                    <i class="bi bi-person-check"></i>
                    <span class="statNumber">${dados.following}</span>
                    <span class="statLabel">Following</span>
                </div>
            </div>
        </div>

        <button onclick="excluirModal(event)" class="removeButton">
            <i class="bi bi-trash3"></i>
        </button>
    `;

    lista.appendChild(card);
    document.querySelector(".inputSearch").value = "";
}

function excluirModal(event){
    event.preventDefault()

    const userCard = event.target.closest(".userCard");
    if(userCard){
        userCard.remove()
    }
}
