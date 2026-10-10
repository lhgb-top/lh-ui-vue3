"""一次性修复：把实时 DemoBlock 引用、但只在围栏内声明的标识符，补进页面级 <script setup>。"""
import io, re, sys

BUILTINS = {'true', 'false', 'null', 'undefined', 'JSON', 'console', 'value'}

# 每页需要补的标识符（en table 先撤销围栏污染）
JOBS = [
    ('docs/en/components/table.md', ['filteredValues', 'resizeLog', 'onFilterChange',
                                     'onColumnResize', 'nestedCols', 'filterCols',
                                     'resizeCols', 'sorterCols'], True),
    ('docs/components/table.md', ['sorterCols'], False),
    ('docs/components/tree.md', ['selKeys', 'chkKeys', 'ctrlData'], False),
    ('docs/en/components/tree.md', ['selKeys', 'chkKeys', 'ctrlData'], False),
    ('docs/components/menu.md', ['active2'], False),
    ('docs/components/rate.md', ['rate3', 'rate4', 'rate5'], False),
    ('docs/en/components/rate.md', ['rate2', 'rate3', 'rate4', 'rate5'], False),
    ('docs/components/segmented.md', ['segDisabled'], False),
    ('docs/en/components/segmented.md', ['viewDisabled', 'viewBlock'], False),
    ('docs/en/components/cascader.md',
     ['enCascOpts', 'enCascAllLevels', 'enCascCollapse', 'enCascDisabled', 'enCascEmit',
      'enCascFilter', 'enCascItem', 'enCascLoose', 'enCascNoClear', 'enCascPlaceholder',
      'enCascReadonly', 'enCascSep', 'enCascSize', 'enCascSize2', 'enCascStrict'], False),
    ('docs/en/components/form.md', ['fpModel'], False),
]


def balanced_lines(lines, start):
    """从 start 行的声明起，按括号配平取完整声明文本块。"""
    depth = 0
    out = []
    for line in lines[start:]:
        out.append(line)
        depth += line.count('(') + line.count('[') + line.count('{')
        depth -= line.count(')') + line.count(']') + line.count('}')
        if depth <= 0:
            break
    return '\n'.join(out)


def extract_decl(src, name):
    """在围栏 script 内找 const name = ... 的完整声明；返回文本或 None。"""
    for m in re.finditer(r'```vue[^`\n]*\n([\s\S]*?)```', src):
        fence = m.group(1)
        lines = fence.split('\n')
        for i, line in enumerate(lines):
            if re.match(r'const ' + re.escape(name) + r'\b', line):
                return balanced_lines(lines, i)
    return None


ok = True
for path, names, undo_first in JOBS:
    s = io.open(path, encoding='utf-8').read()

    if undo_first:
        # 撤销围栏污染：第一个（围栏内）script 恢复为 const cols = [
        m = re.search(r'```vue\n<script setup>\n[\s\S]*?const cols = \[', s)
        assert m, f'{path}: fenced polluted block not found'
        polluted = m.group(0)
        restored = polluted[:len('```vue\n<script setup>\n')] + 'const cols = ['
        s = s.replace(polluted, restored, 1)

    noCode = re.sub(r'```[\s\S]*?```', '', s)
    blocks = re.findall(r'<script setup[^>]*>[\s\S]*?</script>', noCode)
    assert len(blocks) == 1, f'{path}: {len(blocks)} top-level blocks'
    page_block = blocks[0]

    additions = []
    for name in names:
        if re.search(r'(const|function) ' + re.escape(name) + r'\b', page_block):
            continue  # 已声明
        decl = extract_decl(s, name)
        if decl is None:
            print(f'[FAIL] {path}: no fence declaration found for {name}')
            ok = False
            continue
        additions.append(decl)

    if additions:
        idx = s.rfind(page_block)
        assert idx != -1
        end = idx + len(page_block)
        # 在页面块 </script> 前插入
        close = s.rfind('</script>', idx, end)
        assert close != -1
        insert = '\n'.join(additions) + '\n'
        s = s[:close] + insert + s[close:]

    io.open(path, 'w', encoding='utf-8', newline='').write(s)
    print(f'[ok] {path}: +{len(additions)} decls')

print('RESULT:', 'OK' if ok else 'FAIL')
sys.exit(0 if ok else 1)
