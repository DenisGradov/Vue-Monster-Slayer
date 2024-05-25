const maxDamage = 12;
const minDamange = 5;
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      attacksToSpecialAttack: 3,
      winner: null,
      logs: ["The game start!"],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
        this.addLogInLogs(`The game finish with draw!`);
      } else if (value <= 0) {
        this.winner = "monster";
        this.addLogInLogs(`Monster win!`);
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
        this.addLogInLogs(`The game finish with draw!`);
      } else if (value <= 0) {
        this.winner = "player";
        this.addLogInLogs(`Player win!`);
      }
    },
  },
  computed: {
    widthMonsterHealth() {
      return this.monsterHealth + "%";
    },
    widthPlayerHealth() {
      return this.playerHealth + "%";
    },
    specialAttackReady() {
      return this.attacksToSpecialAttack <= 0 ? "active" : "noActive";
    },
    gameIsNow() {
      return this.monsterHealth && this.playerHealth;
    },
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(minDamange, maxDamage);
      if (this.monsterHealth - attackValue >= 0) {
        this.monsterHealth -= attackValue;
        this.addLogInLogs(`The monster lost ${attackValue}hp`);
      } else this.monsterHealth = 0;
      this.attacksToSpecialAttack--;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(minDamange + 3, maxDamage + 3);
      if (this.playerHealth - attackValue >= 0) {
        this.playerHealth -= attackValue;
        this.addLogInLogs(`The player lost ${attackValue}hp`);
      } else this.playerHealth = 0;
    },
    specialAttackMonster() {
      if (this.attacksToSpecialAttack <= 0) {
        const attackValue = getRandomValue(minDamange + 5, maxDamage + 13);

        if (this.monsterHealth - attackValue >= 0) {
          this.monsterHealth -= attackValue;
          this.addLogInLogs(`The monster lost ${attackValue}hp`);
        } else this.monsterHealth = 0;
        this.attackPlayer();
        this.attacksToSpecialAttack = 3;
      }
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.addLogInLogs(`The player regained ${100 - this.playerHealth}hp`);
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;

        this.addLogInLogs(`The player regained ${healValue}hp`);
      }
      this.attackPlayer();
    },
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.logs = ["The game start!"];
    },
    stopGame() {
      this.playerHealth = 0;
    },
    addLogInLogs(log) {
      this.logs.unshift(log);
    },
  },
});

app.mount("#game");
