package com.ihelp.domain.enumeration;

/**
 * The Tag enumeration.
 */
public enum Tag {
    Urgent("Urgent"),
    Housing("Housing"),
    Food("Food"),
    Sanitary("Sanitary"),
    Transportation("Transportation"),
    Search("Search"),
    FirstAid("First Aid"),
    Info("Info"),
    Other("Other"),
    Important("Important");

    private final String value;

    Tag(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
