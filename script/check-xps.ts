const core = require("@actions/core");
const path = require("path");
const files_list = process.argv.slice(2);

interface PreconditionRule<T> {
  $eq?: T;
  $neq?: T;
  $in?: T[];
  $nin?: T[];
}

type RulesDictionaryValues = keyof typeof RulesDictionary;

const RulesDictionary = {
  $eq: "is equal to",
  $neq: "is not equal to",
  $in: "is one of the following:",
  $nin: "is not one of the following:",
} as const;

const getRotatePreconditions = (
  rotatePreConditions: Record<string, Record<RulesDictionaryValues, string>>
) => {
  return Object.entries(rotatePreConditions).map(([key, preValue]) => {
    const condition = Object.entries(preValue).map(
      ([conditionKey, conditionValue]) => {
        const value = Array.isArray(conditionValue)
          ? conditionValue.join(", ")
          : conditionValue;
        return `${
          RulesDictionary[conditionKey as RulesDictionaryValues]
        } ***${value}***`;
      }
    );
    return `**${key}** | ${condition.join(" ")}`;
  });
};

const textTemplate = (keys: any, file: string) => {
  // sort the object keys.distribution by the key
  const distribution = Object.keys(keys.distribution)
    .sort((a: string, b: string) => Number(a) - Number(b))
    .reduce((obj: Record<string, string>, key: string) => {
      obj[key] = keys.distribution[key];
      return obj;
    }, {});

  const percentages = getPercentages(distribution);
  const rotate_emoji = keys.rotate ? "✅" : "❌";

  return `
  ### Changes in the XP file: 💾 \`${file}\`
  The XP name is: 🏷️ **${keys.name}**
  The XP id is: 🔑 **${keys.id}**
  The **rotate** value is now: ${rotate_emoji} \`${keys.rotate}\`

  ### Rotate Preconditions
  Group | Value
  --- | ---
  ${getRotatePreconditions(keys.rotate_precondition).join("\n")}

  ### Distribution Table
  Here is the percentage of the Distribution per group:
  Group name | Percentage
  --- | ---
  ${percentages
    .map(([group_name, percentage]) => `**${group_name}** | ${percentage}%`)
    .join("\n")}
  
  \`\`\`mermaid
  pie title Distribution Pie Chart Rounded values
    %%{init: {'theme': 'base', 'themeVariables': {'primaryTextColor': '#0F60B6','pie1': '#E8E8E8', 'pie2': '#F0EFC1', 'pie3': '#D6F0D6', 'pie4': '#FFEBE5'}}}%%
  ${percentages
    .map(([group_name, percentage]) => `"${group_name}" : ${percentage}`)
    .join("\n")}
  \`\`\`
  `;
};

const getPercentages = (distribution: Record<string, string>) => {
  const MIN = 0;
  const MAX = 1000;
  return Object.entries(distribution).map(([key, group_name]) => {
    const rangeStart = Number(key);
    const rangeEnd =
      Number(
        Object.keys(distribution)[Object.keys(distribution).indexOf(key) + 1]
      ) || MAX;
    const rangeSize = rangeEnd - rangeStart;
    const percentage = (rangeSize / (MAX - MIN)) * 100;
    return [group_name, percentage];
  });
};

const run = () => {
  const comment_header = `## 🧪 Experiments Report`;

  const comment_body = files_list.map((file) => {
    const xp = require(`../${file}`);
    return textTemplate(xp.default, file);
  });

  const comment = `${comment_header} \n ${comment_body.join(
    "\n---------------\n"
  )}`;

  core.setOutput("comment", comment);
  return comment;
};

run();
