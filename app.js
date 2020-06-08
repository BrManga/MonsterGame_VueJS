new Vue({
    el: '#app',
    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false,
        logs: []
    },
    methods: {
        start_game: function () {
            this.game_is_on = true
        },
        attack: function () {
            var point = Math.ceil(Math.random() * 10)
            this.monster_heal -= point
            this.add_to_log({ turn: "P", text: "YOUR ATTACK " + point })
            this.monster_attack();
        },
        special_attack: function () {
            var point = Math.ceil(Math.random() * 25)
            this.monster_heal -= point
            this.add_to_log({ turn: "P", text: "YOUR SPECIAL ATTACK " + point })
            this.monster_attack();
        },
        heal: function () {
            var point = Math.ceil(Math.random() * 20)
            this.player_heal += point
            this.add_to_log({ turn: "P", text: "YOUR HEAL UP " + point })
            this.monster_attack();
        },
        give_up: function () {
            this.player_heal = 0
            this.add_to_log({ turn: "P", text: "YOU GAVE UP!! " })

        },
        monster_attack: function () {
            var point = Math.ceil(Math.random() * 15)
            this.player_heal -= point
            this.add_to_log({ turn: "M", text: "MONSTER ATTACK " + point })

        },
        reset_game: function () {
            this.player_heal = 100;
            this.monster_heal = 100;
        },
        add_to_log: function (log) {
            this.logs.push(log)
        }
    },
    /* To watch special values, used with functions  */
    watch: {
        player_heal: function (value) {
            if (value <= 0) {
                this.player_heal = 0;

                if (confirm("You losed. Wanna try again?")) {
                    this.reset_game();
                    this.logs = []


                }
            } else if (value > 100) {
                this.player_heal = 100

            }
        },
        monster_heal: function (value) {
            if (value <= 0) {
                this.monster_heal = 0
                if (confirm("You win!! Wanna play again?")) {
                    this.reset_game();
                    this.logs = []

                }
            } else if (value > 100) {
                this.monster_heal = 100
            }
        }
    },
    computed: {
        userProgress: function () {
            return { width: this.player_heal + '%' }
        },
        monsterProgress: function () {
            return { width: this.monster_heal + '%' }

        }
    }
})