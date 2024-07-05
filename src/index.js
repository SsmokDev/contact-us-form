const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');
const $title = $('#title');

const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');

const $containerBtnFormTwo= $('#containerBtnFormTwo');
const $btnFormTwo = $('#btnFormTwo');
const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCEP  = $('#cep');

const $containerBtnFormThree= $('#containerBtnFormThree');
const $btnFormThree= $('#btnFormThree');
const $inputHabilidades = $('#habilidades');
const $inputPontosForte = $('#pontosForte');

let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;


let enderecoValido = false;
let cidadeValida = false;
let cepValido = false;

let habilidadesValido = false;
let pontosForteValido = false;


const minLengthText = 2;
const minLengthTextArea = 10;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;

function validarInput(element, minLength, maxlength, regex){
    const closest = $(element).closest('.input-data');
    if(!element.value 
        || ( minLength && element.value.trim().length < minLength)
        || ( maxlength && element.value.trim().length > maxlength)
        || ( regex && !element.value.toLowerCase().match(regex))){
        closest.addClass('error');
        return false;
    }
    closest.removeClass('error');
    return true;
}

async function salvarNoTrello(){
    try{
        const nome = $inputNome.val();
        const sobrenome = $inputSobrenome.val();
        const email = $inputEmail.val();
        const dataNascimento = $inputDataNascimento.val();
        const minibio = $inputMinibio.val();
        const endereco = $inputEndereco.val();
        const complemento = $inputComplemento.val();
        const cidade = $inputCidade.val();
        const cep = $inputCEP.val();
        const habilidades = $inputHabilidades.val();
        const pontosForte = $inputPontosForte.val();

        if(!nome || !sobrenome || !email || !dataNascimento || !endereco || !cidade || !cep || !habilidades || !pontosForte){
            return alert('Favor preencher todos os dados obrifattórios para seguir adiante!');
        }

        const body = {
            name: "Candidato - " + nome + " " + sobrenome ,
            desc: `
            Seguem dados do candidato(a):
            
            ---------------- Dados pessoais ----------------
            Nome: ${nome}
            Sobrenome: ${sobrenome}
            Email: ${email}
            Data de nascimento: ${dataNascimento}
            Minibio: ${minibio}

            ---------------- Dados de Endereço ----------------
            Endereço: ${endereco}
            Cidade: ${cidade}
            Complemento: ${complemento}
            CEP: ${cep}

            ---------------- Dados do Candidato(a) ----------------
            Habilidades: ${habilidades}
            Pontos Fortes: ${pontosForte}
            `
        }

        await fetch('https://api.trello.com/1/cards?idList=668754edf095d93ed240a9f4&key=be2c09507e1bde5122476fcd5e60268e&token=ATTAf8f59b6a82079a5d1122df28105c3a1470b5786eea302b6461b7e48097e52924F5DECBD9', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        });
        return finalizarFormulario();
    }catch(e){
        console.log('Ocorreu erro ao salvar no Trello:', e);
    }
}

 
//formulario 1

function validaFormularioUm(){
    if(nomeValido && sobrenomeValido && dataNascimentoValido && emailValido){
        $containerBtnFormOne.removeClass('disabled');
        $btnFormOne.removeClass('disabled');
        $btnFormOne.off('click').on('click',iniciarFormulario2);
    }else{
        $containerBtnFormOne.addClass('disabled');
        $btnFormOne.addClass('disabled');
        $btnFormOne.off('click');
    }

}

function init(){
    $stepText.text('Passo 1 de 3 - Dados pessoais');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor.')
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function() {
        nomeValido = validarInput(this, minLengthText);
        validaFormularioUm();
    });

    $inputSobrenome.keyup(function() {
        sobrenomeValido = validarInput(this, minLengthText);
        validaFormularioUm();
    });

    $inputDataNascimento.keyup(function() {
        dataNascimentoValido = validarInput(this, minLengthText);
        validaFormularioUm();
    });

    $inputDataNascimento.change(function() {
        dataNascimentoValido = validarInput(this, minLengthText);
        validaFormularioUm();
    });

    $inputEmail.keyup(function() {
        emailValido = validarInput(this, null, null, emailRegex);
        validaFormularioUm();
    });

    $inputDataNascimento.on('focus' , function(){
        this.type = 'date';
    });

    $inputDataNascimento.on('blur', function(){
        if(!this.value){
            this.type = 'text';
        }
    });

    $inputMinibio.keyup(function () {
        validaFormularioUm();
    });

}

// formulario 2

function validaFormularioDois(){
    if(enderecoValido && cidadeValida && cepValido){
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');
        $btnFormTwo.off('click').on('click',iniciarFormulario3);
    }else{
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled');
        $btnFormTwo.off('click');
    }
}

function iniciarFormulario2(){
    $stepText.text('Passo 2 de 3 - Dados de correspondência');
    $stepDescription.text('Precisamos desses dados para que possamos entrar em contato se necessário.');
    $stepOne.hide();
    $stepTwo.show();

    $inputEndereco.keyup(function() {
        enderecoValido = validarInput(this, minLengthTextArea);
        validaFormularioDois();
    });
    
    $inputCidade.keyup(function() {
        cidadeValida = validarInput(this, minLengthText);
        validaFormularioDois();
    });

    $inputCEP.keyup(function() {
        this.value = this.value.replace(/\D/g,'');
        cepValido = validarInput(this, null, null,  cepRegex);
        if(cepValido){
            this.value = this.value.replace(cepRegex, "$1.$2-$3");
        }
        validaFormularioDois();
    });

    $inputComplemento.keyup(function() {
        validaFormularioDois();
    });

}

//formulario 3

function iniciarFormulario3(){
    $stepText.text('Passo 3 de 3 - Conte-nos sobre você');
    $stepDescription.text('Não economize palavras, aqui é onde você pode se destacar.');
    $stepTwo.hide();
    $stepThree.show();

    $inputHabilidades.keyup(function(){
        habilidadesValido = validarInput(this, minLengthTextArea);
        validaFormularioTres();
    });

    $inputPontosForte.keyup(function(){
        pontosForteValido = validarInput(this, minLengthTextArea);
        validaFormularioTres();
    });
}

function validaFormularioTres(){
    if(habilidadesValido && pontosForteValido){
        $containerBtnFormThree.removeClass('disabled');
        $btnFormThree.removeClass('disabled');
        $btnFormThree.off('click').on('click',salvarNoTrello);
    }else{
        $containerBtnFormThree.addClass('disabled');
        $btnFormThree.addClass('disabled');
        $btnFormThree.off('click');
    }
}

function finalizarFormulario() {
    $stepThree.hide();
    $stepDescription.hide();
    $title.text('Muito obrigado pela sua inscrição!');
    $stepText.text('Entraremos em contato assim que possivel, nosso prazo médio de análise é de 5 dias úteis.');
}

init();