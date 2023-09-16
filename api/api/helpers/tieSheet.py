from itertools import combinations

class TournamentScheduler:
    @staticmethod
    def get_round_robin_schedule(teams):
        schedule = []
        num_teams = len(teams)
        num_rounds = 1

        for round in range(num_rounds):
            round_schedule = []
            matchups = list(combinations(teams, 2))

            for matchup in matchups:
                round_schedule.append(matchup)

            teams.insert(1, teams.pop())

            schedule.append(round_schedule)

        return schedule