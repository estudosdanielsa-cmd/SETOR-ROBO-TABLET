// 1. CONFIGURAÇÃO: Insira aqui as chaves que você copiou do Supabase
const SUPABASE_URL = "https://lnmbbziyesrgrzqxwvhp.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_Z_6qpZxu9JlFD-Wnqyz2DA_PQuXTBgN";

// 2. CONEXÃO: Cria o cliente oficial de comunicação com a nuvem
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 3. LOGICA: Exemplo de como o botão "Dar Entrada" vai funcionar no Tablet
async function darEntradaEstoque(idProduto, quantidadeInformada) {
    // Busca o produto atual na tabela do Supabase
    const { data: produto, error } = await supabase
        .from('setor_robo_tablet')
        .select('entrada')
        .eq('id', idProduto)
        .single();

    if (produto) {
        // Faz a conta matemática: quantidade antiga + nova quantidade
        const novaQuantidade = (parseInt(produto.entrada) || 0) + parseInt(quantidadeInformada);

        // Atualiza o novo valor de volta na nuvem
        await supabase
            .from('setor_robo_tablet')
            .update({ entrada: novaQuantidade })
            .eq('id', idProduto);
            
        alert("Entrada registrada com sucesso!");
    } else {
        alert("Produto não encontrado.");
    }
}

