var fs = require("fs");
var shell = require("gulp-shell");

module.exports = function(gulp) {
  var graphGenerate = function(done) {
    var dot = "digraph g {\n";

    var tree = require("gulp/lib/taskTree")(gulp._registry._tasks);

    tree.nodes.forEach(function(node) {
      dot += '"' + node.label + '";\n';
    });

    dot += "\n";

    tree.nodes.forEach(function(node) {
      node.nodes.forEach(function(dep) {
        dot += '"' + dep + '" -> "' + node.label + '";\n';
      });
    });

    dot += "}\n";

    fs.writeFile("gulp.dot", dot, done);
  };

  return {
    graphGenerate: graphGenerate,

    graph: gulp.series(
      shell.task(["dot -Tpng gulp.dot >gulp.png"]),
      graphGenerate
    )
  };
};
