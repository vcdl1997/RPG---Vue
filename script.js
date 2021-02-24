new Vue({
	el: "#app",
	data: {
		acoes: 0,
		jogador: 100,
		monstro: 100,
		endGame: false
	},
	methods: {
		ataque(){
			this.acoes++;
			if(this.monstro - Math.floor(Math.random() * 4 + 1) <= 0){
				this.monstro = 0;
			}else this.monstro -= Math.floor(Math.random() * 4 + 1);

			if(this.jogador - Math.floor(Math.random() * 6 + 1) <= 0){
				this.jogador = 0;
			}else this.jogador -= Math.floor(Math.random() * 6 + 1);

			if(this.monstro == 0 || this.jogador == 0) this.endGame = true;
		},
		ataqueEspecial(){
			this.acoes++;	
			if(this.monstro - Math.floor(Math.random() * 6 + 1) <= 0){
				this.monstro = 0;
			}else this.monstro -= Math.floor(Math.random() * 6 + 1);

			if(this.jogador - Math.floor(Math.random() * 4 + 1) <= 0){
				this.jogador = 0;
			}else this.jogador -= Math.floor(Math.random() * 4 + 1);

			if(this.monstro == 0 || this.jogador == 0) this.endGame = true;
		},
		curar(){
			this.acoes++;
			if(this.monstro + Math.floor(Math.random() * 6 + 1) > 100){
				this.monstro = 100;
			}else this.monstro += Math.floor(Math.random() * 6 + 1);

			if(this.jogador + Math.floor(Math.random() * 4 + 1) > 100){
				this.jogador = 100;
			}else this.jogador += Math.floor(Math.random() * 4 + 1);
		},
		desistir(){
			this.endGame = true;
			this.jogador = 0;
		},
		historico(peso, personagem, acao){
			return document.querySelector("#actions").insertAdjacentHTML('afterbegin', `
				<div class="${personagem == 'jogador' ? 'villain' : 'hero'}">
					<h5 class="mt-5">${acao == 'atingiu' ?
						`${personagem == 'jogador' ? 'MONSTRO' : 'JOGADOR'} ATINGIU ${personagem.toUpperCase()} COM ${peso}` : 
						`${personagem.toUpperCase()} RECUPEROU ${Math.abs(peso)} DE VIDA`
					}
					</h5>
				</div>
			`);
		},
		recomecar(){
			this.acoes = 0;
			this.desistiu = false;
			this.endGame = false;
			this.jogador = 100;			
			this.monstro = 100;
			return document.querySelector("#actions").innerHTML = ``;
		}
	},
	watch:{
		jogador(novo, antigo){
			let peso = antigo - novo;
			let acao = peso > 0 ? 'atingiu' : 'recuperou';
			this.historico(peso, 'jogador', acao);
		},
		monstro(novo, antigo){
			let peso = antigo - novo;
			let acao = peso > 0 ? 'atingiu' : 'recuperou';
			this.historico(peso, 'monstro', acao);
		}
	},
})