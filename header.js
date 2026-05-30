// 1. CONFIGURAÇÃO: Chaves do seu projeto Supabase
const SUPABASE_URL = "https://lnmbbziyesrgrzqxwvhp.supabase.co";
const SUPABASE_KEY = "sb_publishable_Z_6qpZxu9JlFD-Wnqyz2DA_PQuXTBgN";

// 2. CONEXÃO CORRIGIDA: Usa o objeto global injetado pelo script do CDN
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Torna o cliente acessível para as páginas dentro da pasta /paginas
window.supabase = supabaseClient;

// 3. LOGICA: Função para dar entrada de estoque
async function darEntradaEstoque(idProduto, quantidadeInformada) {
    // Busca o produto atual na tabela do Supabase
    const { data: produto, error } = await supabaseClient
        .from('setor_robo_tablet')
        .select('entrada')
        .eq('id', idProduto)
        .single();

    if (error) {
        console.error("Erro ao buscar produto:", error.message);
        alert("Erro ao buscar o produto no banco de dados.");
        return;
    }

    if (produto) {
        // Faz a conta matemática: quantidade antiga + nova quantidade
        const novaQuantidade = (parseInt(produto.entrada) || 0) + parseInt(quantidadeInformada);

        // Atualiza o novo valor de volta na nuvem
        const { error: updateError } = await supabaseClient
            .from('setor_robo_tablet')
            .update({ entrada: novaQuantidade })
            .eq('id', idProduto);
            
        if (updateError) {
            alert("Erro ao atualizar o estoque: " + updateError.message);
        } else {
            alert("Entrada registrada com sucesso!");
            // Se houver uma função para recarregar a tabela na tela, chame ela aqui:
            if (typeof carregarDados === "function") carregarDados();
        }
    } else {
        alert("Produto não encontrado.");
    }
}
