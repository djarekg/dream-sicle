import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPalette } from './command-palette';

describe('CommandPalette', () => {
  let component: CommandPalette;
  let fixture: ComponentFixture<CommandPalette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPalette],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPalette);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits close when Escape is pressed', () => {
    const closeEmitSpy = spyOn(component.close, 'emit');
    const resetSpy = spyOn(component.query, 'set');
    const itemsSpy = spyOn(component.items, 'set');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    const stopPropagationSpy = spyOn(event, 'stopPropagation');

    (component as any).onDialogKeydown(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
    expect(closeEmitSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalledWith('');
    expect(itemsSpy).toHaveBeenCalledWith(undefined);
  });
});
