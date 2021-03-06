import FontTypeConfigPanel from "../../../widgets/configurations/font-type-config-panel";
import FontStyleConfigPanel from "../../../widgets/configurations/font-style-config-panel";
import TextAlignConfigPanel from "../../../widgets/configurations/text-align-config-panel";
import AnimationConfigPanel from "../../../widgets/configurations/animation-config-panel";
import LinkConfigPanel from "../../../widgets/configurations/link-config-panel";

export default function createConfigPanels(id, options) {
  return [
    {
      index: 0,
      icon: "type",
      title: "FONT TYPE",
      panel: FontTypeConfigPanel(id, options.name)
    },
    {
      index: 1,
      title: "FONT STYLE",
      icon: "stype",
      panel: FontStyleConfigPanel(id, options.name, options.ref)
    },
    {
      index: 2,
      title: "FONT ALIGN",
      icon: "align-left",
      panel: TextAlignConfigPanel(id, options.name)
    },
    {
      index: 3,
      title: "ANIMATION",
      icon: "animation",
      panel: AnimationConfigPanel(id, options.name)
    },
    {
      index: 4,
      title: "LINK TO",
      icon: "link-to",
      panel: LinkConfigPanel(id, options.name)
    }
  ];
}
