const { select, input, checkbox } = require('@inquirer/prompts');

let mensagem = "Bem-Vindo ao Aplicativo de Metas!";

let meta = {
    value: "Tomar 2L de água todo dia",
    checked: false
}
let metas = [meta]

const cadastrarMeta = async () => {

    const meta = await input({ message: "Digite a sua meta: " })

    if (meta.length === 0) {
        mensagem = "A Lista de Meta não pode ser vazia!"
        return
    }
    metas.push({ value: meta, checked: false })//função passando um objeto dentro.
    mensagem = "Meta cadastrada com sucesso!"
}


const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar!",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length === 0) {
        mensagem = "Nenhuma meta selecionada!"
        return
    }


    respostas.forEach((respostas) => {
        const meta = metas.find((m) => {
            return m.value == respostas
        })
        meta.checked = true

    })

    mensagem = "Meta(s) marcadas como concluída(s)!"

}



const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if (realizadas.length == 0) {
        mensagem = "Não existe metas realizadas! :("
        return
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })

}


const metasAbertas = async () => {
    const Abertas = metas.filter((meta) => {
        return meta.checked != true // O "!"  inverte um boolean, mesma coisa de fazer isso != True / False
    })

    if (Abertas.length == 0) {
        mensagem = "Não existe metas abertas! :)"
        return
    }

    await select({
        message: "Metas abertas: " + Abertas.length,
        choices: [...Abertas]
    })

}

const deletarMetas = async () => {
    
    const metasDesmarcadas = metas.map((meta) => {
         
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar.length === 0) {
        mensagem = "Nenhum intem foi selecionado para deletar!"
        return
    }

    itensADeletar.forEach((item) => {
        metas =  metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"

}

const MostarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem);
        console.log();
        mensagem = ""

    }
}

const start = async () => { // async usando no await.

    while (true) {
        MostarMensagem()
        const opcao = await select({ //await faz o programa aguarda o usuário.
            message: 'Menu >',
            
            choices: [{
                name: 'Cadastrar Metas',
                value: 'Cadastrar'
            },
            {
                naem: 'Listar Metas',
                value: 'Listar'
            },
            {
                naem: 'Metas realizadas',
                value: 'Realizadas'
            },
            {
                naem: 'Metas abertas',
                value: 'Abertas'
            },

            {
                naem: 'Deletar Metas',
                value: 'Deletar'
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
                break

            case "Listar":
                await listarMetas()
                break

            case "Realizadas":
                await metasRealizadas()
                break

            case "Abertas":
                await metasAbertas()
                break

            case "Deletar":
                await deletarMetas()
                break

            case "Sair":
                console.log("Ate a proxima!")
                return
        }
    }

}
start(); // Chama a função para iniciar o menu