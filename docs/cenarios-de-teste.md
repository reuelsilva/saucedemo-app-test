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
