package com.ihelp.domain.enumeration;

/**
 * The Type enumeration.
 */
public enum Type {
    Request("request"),
    Offer("offer"),
    Announcement("announcement");

    private final String value;

    Type(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
