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

---
**Cenário**: Exibe o produto adicionado na página do carrinho
**Dado** que o usuário está logado
**E** está na página de inventário
**E** o carrinho está vazio
**Quando** o usuário adiciona um produto ao carrinho
**E** clica no ícone do carrinho
**Então** deve ser exibido o produto adicionado contendo nome, preço e quantidade

---
**Cenário**: Remove produto do carrinho pela página do carrinho
**Dado** que o usuário está logado
**E** possui um produto adicionado no carrinho
**E** está na página do carrinho
**Quando** o usuário clica no botão "Remove" do produto
**Então** o produto não é exibido no carrinho
**E** o contador de itens do carrinho não é exibido

---
**Cenário**: Impede checkout com carrinho vazio
**Dado** que o usuário está logado
**E** está na página do carrinho
**E** o carrinho está vazio
**Quando** o usuário clica no botão "Checkout"
**Então** o usuário permanece na página do carrinho

---
**Cenário**: Redireciona para a página de formulário ao clicar em "Checkout"
**Dado** que o usuário está logado
**E** está na página do carrinho
**E** possui no mínimo 1 produto adicionado ao carrinho
**Quando** o usuário clica no botão "Checkout"
**Então** o sistema redireciona para a página "Checkout: Your Information"

---
**Cenário**: Redireciona para a página "Checkout: Overview"
**Dado** que o usuário está logado
**E** possui no mínimo 1 produto adicionado ao carrinho
**E** está na página "Checkout: Your Information"
**Quando** o usuário preenche o campo "First Name"
**E** preenche o campo "Last Name"
**E** preenche o campo "Postal Code"
**E** clica no botão "Continue"
**Então** o sistema redireciona para a página "Checkout: Overview"

---
**Cenário**: Envio de formulário com campo "First Name" vazio
**Dado** que o usuário está logado
**E** possui no mínimo 1 produto adicionado ao carrinho
**E** está na página "Checkout: Your Information"
**Quando** o usuário preenche o campo "Last Name"
**E** preenche o campo "Postal Code"
**E** clica no botão "Continue" 
**Então** o sistema exibe a mensagem "Error: First Name is required"

---
**Cenário**: Envio de formulário com campo "Last Name" vazio
**Dado** que o usuário está logado
**E** possui no mínimo 1 produto adicionado ao carrinho
**E** está na página "Checkout: Your Information"
**Quando** o usuário preenche o campo "First Name"
**E** preenche o campo "Postal Code"
**E** clica no botão "Continue"
**Então** o sistema exibe a mensagem "Error: Last Name is required"

---
**Cenário**: Envio de formulário com campo "Postal Code" vazio
**Dado** que o usuário está logado
**E** possui no mínimo 1 produto adicionado ao carrinho
**E** está na página "Checkout: Your Information"
**Quando** o usuário preenche o campo "First Name"
**E** preenche o campo "Last Name"
**E** clica no botão "Continue"
**Então** o sistema exibe a mensagem "Error: Postal Code is required"

---
**Cenário**: Exibe produtos com nome, preço e quantidade corretos no checkout
**Dado** que o usuário está logado
**E** possui 2 produtos adicionados ao carrinho
**E** preencheu os dados de entrega no formulário de checkout
**Quando** o usuário confirma os dados de entrega
**Então** ele é redirecionado para a página "Checkout: Overview"
**E** deve ser exibido os produtos adicionados contendo nome, preço e quantidade corretos

---
**Cenário**: Exibe o valor do item total corretamente
**Dado** que o usuário está logado
**E** possui 2 produtos adicionados no carrinho
**E** preencheu os dados de entrega no formulário de checkout
**Quando** o usuário confirma os dados de entrega
**Então** ele é redirecionado para a página "Checkout: Overview"
**E** o valor exibido em **"Item total"** deve ser igual à soma dos preços dos produtos adicionados

---
**Cenário**: Exibe o valor total corretamente
**Dado** que o usuário está logado
**E** possui 2 produtos adicionados no carrinho
**E** preencheu os dados de entrega no formulário de checkout
**Quando** o usuário confirma os dados de entrega
**Então** ele é redirecionado para a página "Checkout: Overview"
**E** o valor exibido em **"Total"** deve ser igual à soma do **"Item total"** e da **"Tax"** exibidos na página

---
**Cenário**: Finaliza a compra com sucesso
**Dado** que o usuário está logado
**E** possui 2 produtos adicionados ao carrinho
**E** preencheu os dados de entrega no formulário de checkout
**E** está na página "Checkout: Overview"
**Quando** o usuário clica no botão "Finish"
**Então** o usuário deve ser redirecionado para a página "Checkout: Complete!"

---
**Cenário**: Esvazia o carrinho ao finalizar compra com sucesso
**Dado** que o usuário está logado
**E** possui 2 produtos adicionados ao carrinho
**E** preencheu os dados de entrega no formulário de checkout
**E** foi redirecionado para a página "Checkout: Overview"
**Quando** o usuário finaliza a compra com sucesso
**E** o usuário clica no ícone do carrinho
**Então** a página do carrinho nao exibe produtos adicionados