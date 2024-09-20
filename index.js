const { select, input, checkbox } = require('@inquirer/prompts');

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


const listarMetas = async () => {
    const respostas = await checkbox({
        message:"Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar!",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length === 0){
        console.log("Nenhuma meta selecionada!")     
        return
    }
 

    respostas.forEach((respostas) => {
        const meta = metas.find((m) =>{
            return m.value == respostas
        })
        meta.checked = true
    
    })

    console.log("Meta(s) marcadas como concluída(s)!")

}



const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length ==0){
        console.log("Não existe metas realizadas! :(");
        return
    }
    
    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })

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
                naem: "Metas realizadas",
                value: "Realizadas"
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
                break

            case "Listar":
                    await listarMetas()
                break
            case "Realizadas":
                await metasRealizadas()
                break

            case "Sair":
                console.log("Ate a proxima!")
                return
        }
    }

}
start(); // Chama a função para iniciar o menu