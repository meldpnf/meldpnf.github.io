# Meily Lab — project instructions

## Learning workflow

I use AI heavily for implementation, but I want to gradually understand the codebase while working.

After a meaningful change:
- Give me a very short summary in French.
- Tell me which files you changed.
- Explain what changed, why, and what effect it has.
- Do not explain every line unless I ask.
- Point out one small piece of code that would be useful for me to understand.
- When appropriate, suggest one very small modification I can try myself.

Keep these explanations short and practical. Do not turn them into lessons.

## Knowledge checks

Occasionally, after a task is finished, ask me one short question about something we recently used or changed.

Examples:
- "À quoi sert `border-radius` ici ?"
- "Quel fichier contrôle cette partie du design ?"
- "Pourquoi utilise-t-on `git commit` ?"
- "Qu'est-ce qui déclenche cette interaction ?"

Rules:
- Ask only one question at a time.
- Keep it related to this project.
- Do not interrupt an active task to quiz me.
- Do not ask questions constantly.
- If my answer is wrong or incomplete, correct me briefly and simply.
- Do not make the quiz block progress on the project.

# QA TRAINING

Je suis en train de me former au test logiciel et à la QA.

Je veux utiliser ce projet comme terrain d’entraînement.

Occasionnellement, lorsque le projet est dans un état stable, tu peux me proposer un exercice QA pratique.

Avant tout exercice :
- vérifier qu’un commit Git stable existe ;
- me prévenir explicitement qu’un exercice QA va commencer ;
- ne jamais introduire un bug pendant une tâche normale sans me prévenir ;
- ne jamais mélanger volontairement un bug avec une modification destinée à être considérée comme terminée.

Tu peux volontairement introduire UN bug contrôlé dans le projet pour que je le trouve.

Les bugs doivent être réalistes pour une testeuse web, par exemple :
- comportement UI incorrect ;
- navigation ;
- responsive ;
- problème de formulaire ou validation ;
- état incorrect après certaines actions ;
- comportement JavaScript ;
- edge case ;
- accessibilité ;
- problème d’affichage ;
- interaction utilisateur.

Commencer avec des bugs simples puis augmenter progressivement la difficulté selon ma progression.

Ne jamais introduire :
- vulnérabilité de sécurité ;
- perte de données ;
- comportement destructif ;
- problème volontaire avec les dépendances ou la configuration système ;
- bug qui casse tout le projet.

Quand l’exercice commence :
- me donner uniquement le comportement attendu ;
- éventuellement me donner un contexte utilisateur ;
- ne pas me dire où se trouve le bug ;
- ne pas me dire quelle est sa cause ;
- ne pas me dire quel fichier regarder ;
- me laisser tester librement.

Si je suis bloquée :
- donner des indices progressivement ;
- ne jamais révéler immédiatement la solution.

Quand je pense avoir trouvé le bug, me demander de décrire moi-même :

1. Observed behaviour
2. Expected behaviour
3. Steps to reproduce
4. Environment / conditions if relevant
5. Severity / impact
6. My hypothesis about the cause

Corriger brièvement mes réponses si nécessaire.

Ensuite, m’aider à transformer mes observations en bug report professionnel.

Me laisser essayer de trouver la cause technique et de debugger avant de proposer la correction.

Après la correction :
- expliquer brièvement la root cause ;
- expliquer ce qui a été corrigé ;
- me demander de vérifier que le bug est réellement résolu ;
- vérifier également qu’il n’y a pas de régression évidente.

Toujours m’indiquer explicitement quand l’exercice QA est terminé.

# QA EXERCISE FILES

Chaque exercice QA terminé doit avoir son propre fichier dans :

`docs/qa/exercises/`

Utiliser une numérotation :

QA-001.md
QA-002.md
QA-003.md
etc.

Ne créer le fichier final qu’une fois l’exercice suffisamment avancé pour avoir des informations réelles.

Format à utiliser :

```markdown
# QA-XXX — [Short bug title]

## Context
Courte description de la fonctionnalité testée.

## Expected behaviour
Ce qui devait normalement se passer.

## Observed behaviour
Ce que j’ai réellement observé.

## Steps to reproduce
1.
2.
3.

## Environment
Navigateur, viewport, conditions particulières ou autre information pertinente.

## Severity
Low / Medium / High / Critical

Ajouter une courte justification.

## Investigation
Ce que j’ai testé et vérifié.

## My diagnosis
Mon hypothèse ou la cause que j’ai identifiée.

## Root cause
Cause technique réelle du bug après investigation.

## Fix
Correction appliquée.

Préciser clairement :
- ce que j’ai corrigé moi-même ;
- ce que Claude a corrigé ou assisté.

## Validation
Comment j’ai vérifié que le correctif fonctionne.

## Regression check
Ce que j’ai vérifié pour m’assurer que la correction n’a pas cassé autre chose.

## What I learned
2 à 5 points maximum.

## Related Git commit
Ajouter le commit si disponible.
```

Ne jamais remplir une section avec une information inventée.
Si une information n’est pas connue, laisser la section vide ou indiquer "Not documented".

# PROJECT LEARNING LOG

Créer et maintenir :

`docs/learning-log.md`

Ce fichier doit servir de journal synthétique de mes expériences pratiques.

Il pourra plus tard être utilisé comme source pour présenter des exemples réels sur mes pages DEV et QA.

Ajouter une entrée uniquement après une tâche significative.

Catégories possibles :

DEV
QA
DEBUG
GIT
TOOLING

Ne pas enregistrer tous les petits changements cosmétiques.

Un changement mérite une entrée s’il m’a permis :
- de comprendre un concept ;
- de tester quelque chose ;
- de debugger ;
- de coder moi-même ;
- d’utiliser un nouvel outil ;
- de prendre une décision technique ;
- de pratiquer Git ;
- de réaliser un exercice QA.

Format :

```markdown
## YYYY-MM-DD — [CATEGORY] — [Short title]

**Task**
Courte description de ce que nous faisions.

**My role**
Ce que j’ai personnellement fait :
- conception ;
- décision ;
- test ;
- code manuel ;
- debug ;
- investigation ;
- validation ;
etc.

**AI-assisted work**
Ce que Claude a réalisé ou aidé à réaliser.

**Tools / concepts**
Technologies, outils ou concepts réellement utilisés.

**Result**
Résultat concret obtenu.

**What I learned**
Quelques points courts et factuels.

**Related QA exercise**
Lien vers QA-XXX.md si applicable.

**Related Git commit**
Commit si disponible.
```

# ACCURACY RULE

Il est très important de distinguer mon travail personnel du travail assisté par IA.

Exemples :

Si Claude écrit le CSS et que je définis la direction visuelle, teste le résultat et demande les corrections :

NE PAS écrire :
"J’ai codé le design de la homepage."

Écrire quelque chose comme :
"Defined the visual direction, reviewed iterations and tested an AI-assisted CSS implementation."

Si je modifie personnellement une règle CSS :
le préciser clairement.

Si je trouve personnellement un bug :
le préciser.

Si Claude identifie la cause à ma place :
ne pas prétendre que je l’ai diagnostiquée.

Si tu ne sais pas exactement ce que j’ai fait moi-même, demande-moi avant de l’enregistrer.

# LEARNING DURING DEVELOPMENT

Après une modification significative :
- me donner un résumé très court en français ;
- indiquer les fichiers modifiés ;
- expliquer ce qui a changé et pourquoi ;
- signaler un petit morceau de code intéressant à comprendre ;
- ne pas transformer cela en cours long.

Lorsque c’est pertinent, proposer une micro-modification que je peux essayer moi-même.

De temps en temps, après une tâche terminée, me poser UNE question courte sur quelque chose utilisé récemment dans le projet.

Par exemple :
- À quoi sert cette propriété CSS ?
- Quel fichier contrôle cette partie ?
- Que fait cette commande Git ?
- Qu’est-ce qui déclenche cette interaction ?

Ne jamais interrompre une tâche active pour me poser une question.

Les questions doivent rester occasionnelles.

Si ma réponse est incorrecte :
- me corriger brièvement ;
- expliquer simplement ;
- continuer ensuite le projet normalement.

Privilégier l’apprentissage à partir du code réel de ce projet plutôt que des cours abstraits.

# PORTFOLIO USE

Le learning log et les exercices QA doivent être écrits de manière suffisamment claire pour pouvoir servir plus tard de matière à mes pages DEV et QA.

Cependant :
- ne jamais écrire directement du contenu promotionnel dans ces fichiers ;
- conserver des données factuelles ;
- nous transformerons ces expériences en contenu de portfolio plus tard.

Quand suffisamment d’expériences seront enregistrées, tu pourras me proposer lesquelles seraient pertinentes à présenter publiquement, mais ne les publie jamais automatiquement.
