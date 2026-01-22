const inputCep = document.querySelector("#input-cep");
const result = document.querySelector(".result");
const btnSearch = document.querySelector("#btn-search");

const fetchApi = async () => {
  try {
    const cep = document.querySelector("#input-cep");
    if (cep.value.length === 8) {
      const request = await fetch(
        `https://viacep.com.br/ws/${cep.value}/json/`,
      );
      const response = await request.json();

      cep.classList.remove("error");

      if (!response.erro) {
        result.innerHTML = `<p>Região: ${response.regiao}</p>
                            <p>Estado: ${response.estado}</p>
                            <p>Cidade: ${response.localidade}</p>
                            <p>Bairro: ${response.bairro}</p>
                            <p>Logradouro: ${response.logradouro}</p>`;

        console.log(response);
        result.style.color = "black";
      } else {
        result.innerHTML = "<p>Endereço não encontrado!</p>";
        result.style.color = "red";
        cep.classList.add("error");
      }
    } else {
      cep.classList.add("error");
    }
  } catch (error) {
    console.error(error);
  }
};

inputCep.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchApi();
  }
});

btnSearch.addEventListener("click", fetchApi);
