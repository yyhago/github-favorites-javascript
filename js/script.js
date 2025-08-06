const userName = document.querySelector(".userName");
const avatar_url = document.querySelector("#avatar_url");
const userBio = document.querySelector(".userBio");
const statNumberRepos = document.querySelector("#statNumberRepos");
const statNumberSeguidores = document.querySelector("#statNumberSeguidores");
const statNumberSeguindo = document.querySelector("#statNumberSeguindo");

const url_API = "https://api.github.com/users";
let dadosAPI = null;



async function consultarDadosAPI(usuario){
    try {
        const response = await fetch(`${url_API}/${usuario}`);
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


async function coletarDados(dados){
    userName.innerHTML = dados.name;
    statNumberRepos.innerHTML = dados.public_repos;
    statNumberSeguidores.innerHTML = dados.followers;
    statNumberSeguindo.innerHTML = dados.following;
    userBio.innerHTML = dados.bio;
    avatar_url.src = dados.avatar_url;
}
