'use client';

import React, { useMemo, useState } from 'react';
import { Columns, Filter, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/button';
import { Checkbox } from '../../components/checkbox';
import { Badge } from '../../components/badge';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Separator } from '../../components/separator';
import { useDataGrid } from '../contexts/data-grid-contexts';

const Toolbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const togglePanel = (panel: string | null) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  const { table, split, setSplit } = useDataGrid();

  const visibleColumns = useMemo(() => {
    return table
      .getAllLeafColumns()
      .filter(
        (column) => !['rowNumber', 'pin', 'drag-handle'].includes(column.id),
      )
      .filter((column) =>
        column.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [searchTerm, table]);

  return (
    <div className="bg-muted flex overflow-hidden">
      {activePanel === 'columns' && (
        <div className={cn('w-60 border-l border-border transition-all')}>
          <div className="space-y-3">
            <div className="p-3 flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={visibleColumns.every((col) => col.getIsVisible())}
                  onChange={(e) => {
                    visibleColumns.forEach((col) =>
                      col.toggleVisibility(e.target.checked),
                    );
                  }}
                />
                <Badge className="h-5 min-w-5 rounded-full px-1.5 font-mono tabular-nums">
                  {table.getVisibleLeafColumns().length}
                </Badge>
              </div>
              <Input
                placeholder="Search columns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="max-h-50 overflow-y-auto">
              <div className="px-3 py-1 space-y-3">
                {visibleColumns.length > 0 ? (
                  visibleColumns.map((column) => (
                    <div key={column.id}>
                      <Label className="capitalize">
                        <Checkbox
                          {...{
                            type: 'checkbox',
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                          }}
                        />{' '}
                        <span className="truncate">
                          {column.id
                            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                            .replace(/^./, (str) => str.toUpperCase())}{' '}
                        </span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    No columns found
                  </div>
                )}
              </div>
            </div>
            <Separator />
            <div className="p-3">
              <div className="space-y-3">
                <Label className="capitalize" htmlFor="split">
                  <Checkbox
                    id="split"
                    checked={split}
                    onChange={() => setSplit(!split)}
                  />
                  <span className="truncate">Split Mode</span>
                </Label>
                <Label htmlFor="col-pin">
                  <Checkbox
                    id="col-pin"
                    checked={table.getColumn('pin')?.getIsVisible()}
                    onChange={(e) =>
                      table.getColumn('pin')?.toggleVisibility(e.target.checked)
                    }
                  />
                  <span className="truncate">Show row pin column</span>
                </Label>
                <Label htmlFor="col-row-dnd">
                  <Checkbox
                    id="col-row-dnd"
                    checked={table.getColumn('drag-handle')?.getIsVisible()}
                    onChange={(e) =>
                      table
                        .getColumn('drag-handle')
                        ?.toggleVisibility(e.target.checked)
                    }
                  />
                  <span className="truncate">Show DND Column</span>
                </Label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-10 border-l border-border">
        {[
          { value: 'columns', label: 'Columns', icon: Columns },
          { value: 'toolbar', label: 'Toolbar', icon: Settings },
          { value: 'filter', label: 'Filter', icon: Filter },
        ].map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant="ghost"
            className={cn(
              'writing-mode-vertical-lr rounded-none h-auto w-full hover:!bg-background cursor-pointer',
              activePanel === value && 'bg-background',
            )}
            onClick={() => togglePanel(value)}
          >
            <Icon />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
