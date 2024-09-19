const { select, input } = require('@inquirer/prompts');

let meta = {
    value:"Tomar 2L de água todo dia", 
    checked: false
}
let metas = [meta]

const cadastrarMeta = async () => {

    const meta = await input({message:"Digite a sua meta: "})
    
    if(meta.length === 0) {
        console.log("A Lista de Meta não pode ser vazia!")
        return 
    }
    metas.push({value: meta, checked: false})//função passando um objeto dentro.
}

const start = async () => { // async usando no await.

    while (true) {

        const opcao = await select({ //await faz o programa aguarda o usuário.
            message: 'Menu >',
            choices: [{
                name: 'Cadastrar meta',
                value: 'Cadastrar'
            },
            {
                naem: "Listar Metas",
                value: "Listar"
            },
            {
                name: 'Sair',
                value: 'Sair'
            }
        ], 
        })


        switch (opcao) {
            case "Cadastrar":
                await cadastrarMeta()
                console.log(metas);
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