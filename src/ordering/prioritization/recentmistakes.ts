import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  return {
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const getLastMistakeIndex = (card: CardStatus): number => {
        const results = card.getResults()

        for (let i = results.length - 1; i >= 0; i--) {
          if (results[i] === false) {
            return i
          }
        }

        return -1
      }

      const getMistakeRecencyBucket = (card: CardStatus): number => {
        const results = card.getResults()
        const lastMistakeIndex = getLastMistakeIndex(card)

        if (lastMistakeIndex === -1) {
          return 2
        }

        if (lastMistakeIndex === results.length - 1) {
          return 0
        }

        return 1
      }

      const cardsCopy = cards.slice()
      return cardsCopy.sort((a, b) => {
        return getMistakeRecencyBucket(a) - getMistakeRecencyBucket(b)
      })
    }
  }
};

export { newRecentMistakesFirstSorter }