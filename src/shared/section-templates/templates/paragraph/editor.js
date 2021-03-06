import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Viewer from "./component";
import createConfigPanels from "./config-panels";
import DraftJs from "../../../widgets/draftjs/editor";

import style from "./editor.scss";

class ComponentEditor extends Component {
  static propTypes = {
    selectSection: PropTypes.func.isRequired,
    setSectionData: PropTypes.func.isRequired
  };
  static contextTypes = {
    configPanelsManager: PropTypes.object.isRequired,
    activeSection: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }
  onTitleChange(data) {
    this.props.setSectionData(["title", "contentState"], data);
  }
  onContentChange(data) {
    this.props.setSectionData(["content", "contentState"], data);
  }
  getAlignment(alignment) {
    switch (alignment) {
      case "left":
      case "right":
      case "center":
        return { textAlign: alignment };
      case "justify-l":
        return { textAlign: "justify" };
      case "justify-c":
        return { textAlign: "justify", textAlignLast: "center" };
      case "justify-r":
        return { textAlign: "justify", textAlignLast: "right" };
    }
  }
  getFontStyle(fontStyle) {
    switch (fontStyle) {
      case "uppercase":
        return { textTransform: "uppercase" };
      case "lowercase":
        return { textTransform: "lowercase" };
      case "capitalize":
        return { textTransform: "capitalize" };
      default:
        return {};
    }
  }
  getFontSize(fontType) {
    switch (fontType) {
      case "big-heading":
        return { fontSize: 28 };
      case "heading":
        return { fontSize: 24 };
      case "quote":
        return {
          fontSize: 14,
          fontStyle: "italic"
        };
      default:
        return {
          fontSize: 16,
          fontFamily: "Arial"
        };
    }
  }
  getDraftJsStyle(props) {
    return {
      ...this.getFontStyle(props.fontStyle),
      ...this.getFontSize(props.fontType),
      ...this.getAlignment(props.alignment)
    };
  }
  componentDidMount() {
    this.context.configPanelsManager.register(
      this.props.id + "title",
      createConfigPanels(this.props.id, { name: "title", ref: this.refs.title })
    );
    this.context.configPanelsManager.register(
      this.props.id + "content",
      createConfigPanels(this.props.id, {
        name: "content",
        ref: this.refs.content
      })
    );
  }

  render() {
    const { title, content } = this.props;
    const { id, childWidget } = this.context.activeSection;
    return (
      <div className={"section paragraph"}>
        <h1
          style={this.getDraftJsStyle(title)}
          onClick={e => {
            e.stopPropagation();
            this.props.selectSection(this.props.id, "title");
          }}
          className={classnames(style["editor"], {
            [style["active"]]: id === this.props.id && childWidget === "title"
          })}
        >
          <DraftJs ref="title" onEditorChange={this.onTitleChange} {...title} />
        </h1>

        <div
          style={this.getDraftJsStyle(content)}
          onClick={e => {
            e.stopPropagation();
            this.props.selectSection(this.props.id, "content");
          }}
          className={classnames(style["editor"], {
            [style["active"]]: id === this.props.id && childWidget === "content"
          })}
        >
          <DraftJs
            ref="content"
            onEditorChange={this.onContentChange}
            {...content}
          />
        </div>
      </div>
    );
  }
}

export default ComponentEditor;
