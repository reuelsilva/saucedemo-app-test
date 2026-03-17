## Cenários de Teste

**Cenário**: Login com usuário válido e senha correta

**Dado** que o usuário está na página de login 

**Quando** o usuário preenche o campo "Username" com um usuário cadastrado

**E** preenche o campo "Password" com a senha correta

**E** clica no botão "Login"

**Então** o sistema redireciona o usuário para a página de inventário.

---
**Cenário**: Login com senha incorreta

**Dado** que o usuário está na página de login 

**Quando** o usuário preenche o campo "Username" com um usuário cadastrado

**E** preenche o campo "Password" com uma senha incorreta

**E** clica no botão "Login"

**Então** o sistema exibe a mensagem "Username and password do not match any user in this service".

---
**Cenário**: Login com campo senha vazio

**Dado** que o usuário está na página de login

**Quando** o usuário preenche o campo "Username"

**E** clica no botão "Login" sem o campo "Password" preenchido

**Então** o sistema exibe a mensagem "Password is required".

---
**Cenário**: Login com campo usuário vazio

**Dado** que o usuário está na página de login

**Quando** o usuário preenche o campo "Password"

**E** clica no botão "Login" sem o campo "Username" preenchido

**Então** o sistema exibe a mensagem "Username is required".

---
**Cenário**: Atualização do contador ao adicionar produto ao carrinho
**Dado** que o usuário está logado 
**E** está na página de inventário
**E** o carrinho está vazio
**Quando** o usuário adiciona um produto ao carrinho
**Então** o contador do carrinho exibe "1"

---
**Cenário**: Atualização do contador ao remover produto do carrinho
**Dado** que o usuário está logado
**E** está na página de inventário
**E** o carrinho possui 2 produtos
**Quando** o usuário remove um produto do carrinho
**Então** o contador do carrinho exibe "1"

---
**Cenário**: Exibe botão "Remove" ao adicionar produto ao carrinho
**Dado** que o usuário está logado 
**E** está na página de inventário
**Quando** o usuário adiciona um produto ao carrinho
**Então** o botão "Add to cart" do item adicionado é alterado para "Remove"

---
**Cenário**: Exibe botão "Add to cart" ao remover produto do carrinho
**Dado** que o usuário está logado
**E** está na página de inventário
**Quando** o usuário remove um produto do carrinho
**Então** o botão "Remove" do item removido é alterado para "Add to cart"

---
**Cenário**: Remove o contador ao esvaziar o carrinho
**Dado** que o usuário está logado
**E** está na página de inventário
**E** o carrinho possui 1 produto
**Quando** o usuário exclui o produto do carrinho
**Então** o contador do carrinho não é exibido