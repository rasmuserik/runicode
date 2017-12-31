import React, { Component } from "react";
import runic from "./runic";

const defaultStyle = {
  fontFamily: "junicode",
  position: "fixed",
  fontSize: "16px",
  resize: "none",
  lineHeight: "18px"
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      alphabet: runic,
      text: `RUNICODE - a small utility to write unicode runes.

change this text to update the runes below.
just copy the text below, to where you want the runes,
and make sure your font supports unicode runes,
- otherwise search for the junicode font

extra runes can be added by prefixing their name with \\,
i.e. \\th \\s1 \\gar \\ger
ELDER FUTHARK: fu\\thark gwhnij\\eohpzstbeml\\i1do

you can change the substitions by editing
the field to the left :)`
    };
  }
  render() {
    const replacement = {};
    for (const [k, v] of this.state.alphabet
      .split("\n")
      .map(s => s.trim().split(/\s+/))
      .filter(a => !!a[1])) {
      replacement[k] = v;
    }
    const encoded = this.state.text.replace(
      RegExp(
        "(" +
          Object.keys(replacement)
            .map(s => s.replace(/[()|\\]/g, s => "\\" + s))
            .join("|") +
          ")",
        "g"
      ),
      s => replacement[s]
    );

    return (
      <div className="App" style={{ display: "inline-block", height: "100%" }}>
        <textarea
          onChange={e => this.setState({ alphabet: e.target.value })}
          style={{
            ...defaultStyle,
            top: "5%",
            left: "5%",
            width: "12%",
            height: "85%"
          }}
          value={this.state.alphabet}
        />
        <textarea
          onChange={e => this.setState({ text: e.target.value })}
          style={{
            ...defaultStyle,
            top: "5%",
            left: "20%",
            width: "75%",
            height: "40%"
          }}
          value={this.state.text}
        />
        <div
          style={{
            ...defaultStyle,
            display: "inline-block",
            top: "50%",
            whiteSpace: "pre-wrap",
            overflow: "auto",
            left: "20%",
            width: "75%",
            height: "40%"
          }}
        >
          {encoded}
        </div>
      </div>
    );
  }
}

export default App;
