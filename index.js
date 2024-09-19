const { select } = require('@inquirer/prompts');

const cadastrarMeta = async () => {}

const start = async () => {

    while (true) {

        const opcao = await select({
            message: 'Menu >',
            choices: [{
                name: 'Cadastrar meta',
                value: 'Cadastrar'
            },
            {
                name: 'Sair',
                value: 'Sair'
            }
        ], 
        })

        switch (opcao) {
            case "Cadastrar":
                console.log(" Vamos cadastrar");
                break;

            case "Listar":
                console.log(" Vamos listar");
                break;

            case "Sair":
                console.log("Ate a proxima!");
                return;
        }
    }

}
start(); // Chama a função para iniciar o menu