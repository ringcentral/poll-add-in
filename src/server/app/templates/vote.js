export const voteTemp = `
{
  "type": "AdaptiveCard",
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.3",
  "body": [
    {
      "type": "TextBlock",
      "text": "{{title}}"
    },
    {
      "type": "TextBlock",
      "text": "{{desc}}"
    },
    {
      "type": "Input.ChoiceSet",
      "id": "voteId",
      "style": "compact",
      "isRequired": true,
      "isMultiSelect": {{multi}},
      "choices": [
        {{#each options}}
        {
          "title": "{{title}}",
          "value": "{{id}}"
        }{{sep}}
        {{/each}}
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit",
      "data": {{data}}
    }
  ]
}

`
