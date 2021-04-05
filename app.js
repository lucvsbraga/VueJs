new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }

    },
    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = [];
        },
        soco() {
            let danoSoco = Math.floor(Math.random() * 10)
            this.monsterLife -= danoSoco;
            if (this.monsterLife <= 0)
                this.monsterLife = 0;
            if (this.playerLife <= 0)
                this.playerLife = 0;
            this.monsterAttack();
            this.registerLog(`O jogador deu um soco no monstro com ${danoSoco} de dano.`, 'player')
        },
        chute() {
            let danoChute = parseInt(Math.floor(Math.random() * 16));
            this.monsterLife -= danoChute;
            if (this.monsterLife <= 0)
                this.monsterLife = 0;
            if (this.playerLife <= 0)
                this.playerLife = 0;
            this.monsterAttack();
            this.registerLog(`O jogador deu um chute no monstro com ${danoChute} de dano.`, 'player')
        },
        monsterAttack() {
            let danoMonstro = Math.floor(Math.random() * 18);
            this.playerLife -= danoMonstro;
            if (this.playerLife <= 0)
                this.playerLife = 0;
            this.registerLog(`O monstro atingiu o jogador com ${danoMonstro} de dano.`, 'monster')
        },
        curar() {
            let cura = Math.floor(Math.random() * 40);
            if (this.playerLife + cura >= 100) {
                this, playerLife = 100;
                this.monsterAttack();
                this.registerLog(`O jogador se curou em ${cura} de life.`, 'player')
            } else {
                this.playerLife += cura;
                this.monsterAttack();
                this.registerLog(`O jogador se curou em ${cura} de life.`, 'player')
            }
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        }

    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    },
})